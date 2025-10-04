interface CommentsSectionProps {
  selectedAction: string;
  comment: string;
  setComment: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  selectedAction,
  comment,
  setComment,
  onConfirm,
  onCancel,
  loading,
}) => {
  // Function to get the appropriate button styling based on action
  const getConfirmButtonStyle = (action: string) => {
    switch (action.toLowerCase()) {
      case 'approve':
        return "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-900 transition disabled:opacity-50";
      case 'reject':
        return "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50";
      case 'block':
        return "px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition disabled:opacity-50";
      case 'activate':
        return "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50";
      default:
        return "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50";
    }
  };

  // Function to get loading text based on action
  const getLoadingText = (action: string) => {
    switch (action.toLowerCase()) {
      case 'approve':
        return "Approving...";
      case 'reject':
        return "Rejecting...";
      case 'block':
        return "Blocking...";
      case 'activate':
        return "Activating...";
      default:
        return "Processing...";
    }
  };

  return (
    <div className="border border-gray-700 rounded-xl p-4 w-[800px] mx-auto mt-3 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {selectedAction} Comment / Note
      </h2>

      <textarea
        className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder={`Enter your comment for ${selectedAction.toLowerCase()}ing this company`}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex space-x-4">
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={getConfirmButtonStyle(selectedAction)}
        >
          {loading ? getLoadingText(selectedAction) : `Confirm ${selectedAction}`}
        </button>

      </div>
    </div>
  );
};