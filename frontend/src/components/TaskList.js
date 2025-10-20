import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, loading }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      case 'pending':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          <h5 className="mt-3 text-muted">No tasks yet</h5>
          <p className="text-muted">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      {tasks.map((task) => (
        <div key={task.id} className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm hover-shadow">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title mb-0">{task.title}</h5>
                <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <p className="card-text text-muted flex-grow-1">
                {task.description || 'No description'}
              </p>
              <div className="text-muted small mb-3">
                <i className="bi bi-clock me-1"></i>
                {formatDate(task.updatedAt)}
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary flex-grow-1"
                  onClick={() => onEdit(task)}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(task.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
