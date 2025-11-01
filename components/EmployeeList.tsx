
import React from 'react';
import { Employee } from '../types';
import { EditIcon, DeleteIcon, SparklesIcon } from './icons';
import Button from './Button';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: string) => void;
  onGenerateReview: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete, onGenerateReview }) => {
  return (
    <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden lg:table-cell">Department</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={employee.avatarUrl} alt={employee.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-text">{employee.name}</div>
                                            <div className="text-sm text-muted">{employee.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-text">{employee.role}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {employee.department}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end items-center space-x-2">
                                        <button onClick={() => onGenerateReview(employee)} className="text-primary hover:text-primary-hover" title="Generate Review">
                                            <SparklesIcon />
                                        </button>
                                        <button onClick={() => onEdit(employee)} className="text-indigo-600 hover:text-indigo-900" title="Edit Employee">
                                            <EditIcon />
                                        </button>
                                        <button onClick={() => onDelete(employee.id)} className="text-red-600 hover:text-red-900" title="Delete Employee">
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default EmployeeList;
