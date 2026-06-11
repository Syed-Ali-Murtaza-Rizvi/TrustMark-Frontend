import React, { useState } from 'react';
import { bulkUpdateStudentCoursesByManagement } from '../../services/trustmarkApi';

export default function BulkCourseUpdateModal({ managementId, onClose, onSuccess }) {
  const [year, setYear] = useState('2');
  const [program, setProgram] = useState('CS');
  const [courses, setCourses] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!year || !program || !courses) return;
    const confirmed = window.confirm(
      `Are you sure? This will replace courses for all students in Year ${year}, Program ${program} under this organization.`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      // Accept any course identifier (numeric or string codes like "CS1").
      const courseIds = courses
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await bulkUpdateStudentCoursesByManagement({
        managementId,
        program,
        year: Number(year),
        courseIds,
      });
      onSuccess && onSuccess();
      onClose && onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update courses.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Bulk Course Update</h2>
        <div className="space-y-3">
          <label>
            Year
            <input
              type="number"
              placeholder="2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="block w-full border px-2 py-1 mt-1"
            />
          </label>

          <label>
            Program
            <input
              type="text"
              placeholder="CS"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="block w-full border px-2 py-1 mt-1"
            />
          </label>

          <label>
            Courses (comma-separated IDs)
            <input
              type="text"
              placeholder="12,34,56"
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
              className="block w-full border px-2 py-1 mt-1"
            />
          </label>

          <p className="text-sm text-red-600">Warning: This operation is destructive and cannot be undone.</p>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Courses'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
