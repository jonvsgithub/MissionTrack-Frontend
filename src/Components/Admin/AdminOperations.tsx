interface AdminOperationsProps {
  onActionClick: (action: string) => void;
}

 const AdminOperations: React.FC<AdminOperationsProps> = ({ onActionClick }) => {
  return (
    <div className="p-4 mb-3 bg-white border rounded-lg shadow-sm w-[800px]">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Admin Operations</h3>
      <div className="flex justify-between">
      <div className="flex space-x-3">
        <button
          onClick={() => onActionClick("Approve")}
          className="px-4 py-1 text-white bg-primaryColor-800 rounded-xl"
        >
          Approve
        </button>
      
        <button
          onClick={() => onActionClick("Reject")}
          className="px-4 py-1 text-white bg-[#FA7878] rounded-2xl"
        >
          Reject
        </button>
      </div>
      <div className="flex space-x-3">
          <button
          onClick={() => onActionClick("Block")}
          className="px-4 py-1 text-white bg-red-600 rounded-2xl"
        >
          Block
        </button>
          <button
          onClick={() => onActionClick("Activate")}
          className="px-4 py-1 text-white bg-accent-500 rounded-2xl"
        >
          Activate
        </button>
      </div>
      </div>
    </div>
  );
};
export default AdminOperations

