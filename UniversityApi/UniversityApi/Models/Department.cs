namespace UniversityApi.Models
{
    public class Department
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Faculty { get; set; }
        public ICollection<Teacher> Teachers { get; set; } = new List<Teacher>();
        public ICollection<Student> Students { get; set; } = new List<Student>();
    }
}
