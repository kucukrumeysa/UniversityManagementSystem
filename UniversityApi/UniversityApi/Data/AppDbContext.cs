using Microsoft.EntityFrameworkCore;
using UniversityApi.Models;

namespace UniversityApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Department - Teacher (1:N)
            modelBuilder.Entity<Teacher>()
                .HasOne(t => t.Department)
                .WithMany(d => d.Teachers)
                .HasForeignKey(t => t.DepartmentId)
                .OnDelete(DeleteBehavior.Cascade);

            // Department - Student (1:N)
            modelBuilder.Entity<Student>()
                .HasOne(s => s.Department)
                .WithMany(d => d.Students)
                .HasForeignKey(s => s.DepartmentId)
                .OnDelete(DeleteBehavior.Cascade);

            // Student - Teacher (N:M)
            modelBuilder.Entity<Student>()
                .HasMany(s => s.Teachers)
                .WithMany(t => t.Students)
                .UsingEntity("StudentTeacher",
                    l => l.HasOne(typeof(Teacher)).WithMany().HasForeignKey("TeachersId").OnDelete(DeleteBehavior.NoAction),
                    r => r.HasOne(typeof(Student)).WithMany().HasForeignKey("StudentsId").OnDelete(DeleteBehavior.NoAction)
                );
            // Seed Data
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = 1, Name = "Bilgisayar Mühendisliği", Faculty = "Mühendislik" },
                new Department { Id = 2, Name = "Matematik", Faculty = "Fen-Edebiyat" }
            );

            modelBuilder.Entity<Teacher>().HasData(
                new Teacher { Id = 1, Name = "Ahmet", LastName = "Yılmaz", Title = "Dr.", DepartmentId = 1 },
                new Teacher { Id = 2, Name = "Ayşe", LastName = "Kaya", Title = "Prof.", DepartmentId = 2 }
            );

            modelBuilder.Entity<Student>().HasData(
                new Student { Id = 1, Name = "Mehmet", LastName = "Demir", StudentNumber = "2021001", DepartmentId = 1 },
                new Student { Id = 2, Name = "Fatma", LastName = "Çelik", StudentNumber = "2021002", DepartmentId = 2 }
            );

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", Password = "admin123", Role = "Admin" },
                new User { Id = 2, Username = "user", Password = "user123", Role = "User" }
            );
        }


    }
}