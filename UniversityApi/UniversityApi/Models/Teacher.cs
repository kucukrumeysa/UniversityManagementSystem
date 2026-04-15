namespace UniversityApi.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public string? Title { get; set; }
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
        public ICollection<Student> Students { get; set; } = new List<Student>();

    }
}
