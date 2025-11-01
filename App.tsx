
import React, { useState } from 'react';
import { Employee } from './types';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import AddEditEmployeeModal from './components/AddEditEmployeeModal';
import GenerateReviewModal from './components/GenerateReviewModal';
import Button from './components/Button';
import { PlusIcon } from './components/icons';

const initialEmployees: Employee[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Frontend Developer', department: 'Engineering', avatarUrl: 'https://picsum.photos/id/1027/200/200' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', role: 'Backend Developer', department: 'Engineering', avatarUrl: 'https://picsum.photos/id/1005/200/200' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'UI/UX Designer', department: 'Design', avatarUrl: 'https://picsum.photos/id/1025/200/200' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Project Manager', department: 'Management', avatarUrl: 'https://picsum.photos/id/1011/200/200' },
];

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleOpenAddModal = () => {
    setSelectedEmployee(null);
    setIsAddEditModalOpen(true);
  };
  
  const handleOpenEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAddEditModalOpen(true);
  };
  
  const handleOpenReviewModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsReviewModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsAddEditModalOpen(false);
    setIsReviewModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = (employeeData: Omit<Employee, 'id' | 'avatarUrl'> & { id?: string }) => {
    if (employeeData.id) { // Editing existing employee
      setEmployees(employees.map(emp => emp.id === employeeData.id ? { ...emp, ...employeeData } : emp));
    } else { // Adding new employee
      const newEmployee: Employee = {
        ...employeeData,
        id: new Date().getTime().toString(),
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/200/200`,
      };
      setEmployees([newEmployee, ...employees]);
    }
    handleCloseModals();
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex justify-end mb-4">
                <Button onClick={handleOpenAddModal}>
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Add Employee
                </Button>
            </div>
            <EmployeeList 
                employees={employees}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteEmployee}
                onGenerateReview={handleOpenReviewModal}
            />
        </div>
      </main>
      <AddEditEmployeeModal
        isOpen={isAddEditModalOpen}
        onClose={handleCloseModals}
        onSave={handleSaveEmployee}
        employeeToEdit={selectedEmployee}
      />
      <GenerateReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseModals}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default App;
