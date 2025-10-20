import * as React from 'react';
const { useEffect, useState } = React;

type Status = 'todo' | 'in_progress' | 'done';

type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: number;
  updatedAt: number;
};

type Props = { tasksPath?: string };

const STORAGE_KEY = 'collab_tasks';
const bc =
  typeof window !== 'undefined' ? new BroadcastChannel('collab') : null;

function isStatus(x: any): x is Status {
  return x === 'todo' || x === 'in_progress' || x === 'done';
}

function toTask(obj: any): Task | null {
  if (!obj || typeof obj !== 'object') return null;
  const id = typeof obj.id === 'string' ? obj.id : crypto.randomUUID();
  const title = typeof obj.title === 'string' ? obj.title : '';
  const description =
    typeof obj.description === 'string' ? obj.description : undefined;
  const status: Status = isStatus(obj.status) ? obj.status : 'todo';
  const createdAt = Number.isFinite(obj.createdAt) ? obj.createdAt : Date.now();
  const updatedAt = Number.isFinite(obj.updatedAt) ? obj.updatedAt : createdAt;
  return { id, title, description, status, createdAt, updatedAt };
}

function normalize(arr: any): Task[] {
  if (!Array.isArray(arr)) return [];
  const out: Task[] = [];
  for (const x of arr) {
    const t = toTask(x);
    if (t) out.push(t);
  }
  return out;
}

function load(): Task[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return normalize(raw);
  } catch {
    return [];
  }
}

function save(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  bc?.postMessage({ type: 'sync', tasks });
}
const NgInsightsWidget: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    boardId?: string;
  }
> = (props) => React.createElement('ng-insights-widget' as any, props);

export default function CollabEditor(_: Props) {
  const [tasks, setTasks] = useState<Task[]>(load());
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!bc) return;
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === 'sync') {
        const incoming = normalize(e.data.tasks);
        setTasks(incoming); // ✅ always Task[]
      }
    };
    bc.addEventListener('message', onMsg);
    return () => bc.removeEventListener('message', onMsg);
  }, []);

  function add() {
    const now = Date.now();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description: desc || undefined,
      status: 'todo' as const,
      createdAt: now,
      updatedAt: now,
    };
    const next: Task[] = [...tasks, newTask];
    setTasks(next);
    save(next);
    setTitle('');
    setDesc('');
  }

  function select(t: Task) {
    document.dispatchEvent(
      new CustomEvent('taskSelected', { detail: t, bubbles: true })
    );
  }

  function suggestLabels() {
    const text = `${title} ${desc}`.toLowerCase();
    const labels = new Set<string>();
    if (text.includes('bug') || text.includes('fix')) labels.add('bug');
    if (text.includes('ui') || text.includes('style')) labels.add('ui');
    if (text.includes('auth') || text.includes('api')) labels.add('backend');
    alert(`Suggested: ${[...labels].join(', ') || 'none'}`);
  }

  return (
    <div className="p-4 max-w-xl">
      <h2 className="text-xl font-semibold mb-3">React Collab Editor</h2>

      <div className="space-y-2 mb-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={add}
            className="px-3 py-2 rounded bg-black text-white"
          >
            Add Task
          </button>
          <button onClick={suggestLabels} className="px-3 py-2 rounded border">
            Suggest Labels
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="border rounded p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => select(t)}
          >
            <div className="font-medium">{t.title}</div>
            {t.description && (
              <div className="text-sm text-gray-600">{t.description}</div>
            )}
            <div className="text-xs mt-1">Status: {t.status}</div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <NgInsightsWidget boardId="demo" />
      </div>
    </div>
  );
}
