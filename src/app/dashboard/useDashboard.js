import { useState } from "react";

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [dashboardState, setDashboardState] = useState({
    userToEdit: null,
    showModal: false,
    searchTerm: '',
    showDropdown: false,
    selectedRole: '',
    showRoleDropdown: false,
    sortOrder: 'asc',
  })
  const [showTopicModal, setShowTopicModal] = useState(false);
  const handleRoleSelection = (role) => {
    setDashboardState({
      ...dashboardState,
      selectedRole: role,
    })
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
    setIsLoading(false)
  };

  const handleDelete = async (its) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const response = await fetch(`/api/delete-user/${its}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Deletion failed");

        setUsers(users.filter((user) => user.its !== its));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return {
    handleRoleSelection,
    fetchUsers,
    isLoading,
    setIsLoading,
    handleDelete,
    dashboardState,
    setDashboardState,
    users,
    setUsers,
    showTopicModal,
    setShowTopicModal,
  }
}