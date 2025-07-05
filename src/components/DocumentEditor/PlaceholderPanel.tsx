import React from 'react';

export interface PlaceholderMeta {
  id: string;
  value: string;
  page: number;
  pos: number;
}

interface PlaceholderPanelProps {
  placeholders: PlaceholderMeta[];
  onEdit: (id: string, newValue: string) => void;
  onDelete: (id: string) => void;
}

const PlaceholderPanel: React.FC<PlaceholderPanelProps> = ({ placeholders, onEdit, onDelete }) => {
  return (
    <div className="w-full">
      <div className="font-semibold mb-4">Placeholders</div>
      {placeholders.length === 0 && (
        <div className="text-gray-400 text-sm mb-4">No placeholders added yet.</div>
      )}
      {placeholders.map((ph) => (
        <div
          key={ph.id}
          className="mb-6 p-4 bg-[#F8FAFC] rounded-lg border border-gray-200 relative"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-800 cursor-pointer hover:underline">
              {ph.value}
            </span>
            <button
              className="text-gray-400 hover:text-red-500"
              onClick={() => onDelete(ph.id)}
            >
              &#10005;
            </button>
          </div>
          <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
            Located at:
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
              Page {ph.page}
            </span>
          </div>
          <div className="mb-2">
            <label className="block text-xs text-gray-500 mb-1">Placeholder Name</label>
            <input
              className="border rounded px-3 py-2 text-sm w-full"
              value={ph.value}
              onChange={(e) => onEdit(ph.id, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceholderPanel; 