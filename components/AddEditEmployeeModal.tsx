
import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import Modal from './Modal';
import Button from './Button';

interface AddEditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, 'id' | 'avatarUrl'> & { id?: string }) => void;
  employeeToEdit: Employee | null;
}

const AddEditEmployeeModal: React.FC<AddEditEmployeeModalProps> = ({ isOpen, onClose, onSave, employeeToEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setRole(employeeToEdit.role);
      setDepartment(employeeToEdit.department);
    } else {
      setName('');
      setEmail('');
      setRole('');
      setDepartment('');
    }
  }, [employeeToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: employeeToEdit?.id,
      name,
      email,
      role,
      department,
    });
  };
  
  const isFormValid = name && email && role && department;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={employeeToEdit ? 'Edit Employee' : 'Add New Employee'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>Save</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
        </div>
      </form>
    </Modal>
  );
};

export default AddEditEmployeeModal;
