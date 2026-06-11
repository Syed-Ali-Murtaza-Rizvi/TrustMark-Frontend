import axiosInstance from "../utils/axiosInstance";

/**
 * Replace courses for all students in a management + program + year cohort.
 */
export async function bulkUpdateStudentCoursesByManagement({
  managementId,
  program,
  year,
  courseIds,
}) {
  const { data } = await axiosInstance.post(
    `/api/managements/${managementId}/programs/${encodeURIComponent(program)}/years/${year}/bulk-update-student-courses/`,
    { course_ids: courseIds }
  );
  return data;
}
