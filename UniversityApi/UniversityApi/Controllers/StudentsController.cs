using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityApi.Data;
using UniversityApi.Models;

namespace UniversityApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await context.Students
                .Include(s => s.Department)
                .Include(s => s.Teachers)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await context.Students
                .Include(s => s.Department)
                .Include(s => s.Teachers)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null) return NotFound();
            return student;
        }

        [HttpGet("{id}/teachers")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetStudentTeachers(int id)
        {
            var exists = await context.Students.AnyAsync(s => s.Id == id);
            if (!exists) return NotFound();

            return await context.Teachers
                .Where(t => t.Students.Any(s => s.Id == id))
                .ToListAsync();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            var deptExists = await context.Departments.AnyAsync(d => d.Id == student.DepartmentId);
            if (!deptExists) return BadRequest($"ID'si {student.DepartmentId} olan bölüm bulunamadı.");

            context.Students.Add(student);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            if (id != student.Id) return BadRequest();
            context.Entry(student).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await context.Students.FindAsync(id);
            if (student == null) return NotFound();
            context.Students.Remove(student);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}