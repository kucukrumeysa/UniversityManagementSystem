namespace UniversityApi.Models
{
    public class Student
    {
        public int Id { get; set; }
                public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string StudentNumber { get; set; }
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
        public ICollection<Teacher> Teachers { get; set; } = new List<Teacher>();
    }
}
