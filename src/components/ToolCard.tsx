import Link from 'next/link';

type ToolCardProps = {
  title: string;
  description: string;
  path: string;
  icon: string;
};

/**
 * ツールカードコンポーネント
 * 各ツールの情報を表示するカードUIを提供します
 */
export default function ToolCard({ title, description, path, icon }: ToolCardProps) {
  return (
    <Link
      href={path}
      className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200"
    >
      <div className="flex items-start space-x-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </Link>
  );
} 