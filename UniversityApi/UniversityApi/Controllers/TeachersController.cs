using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityApi.Data;
using UniversityApi.Models;

namespace UniversityApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachers()
        {
            return await context.Teachers
                .Include(t => t.Department)
                .Include(t => t.Students)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Teacher>> GetTeacher(int id)
        {
            var teacher = await context.Teachers
                .Include(t => t.Department)
                .Include(t => t.Students)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (teacher == null) return NotFound();
            return teacher;
        }

        [HttpGet("{id}/students")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Student>>> GetTeacherStudents(int id)
        {
            var exists = await context.Teachers.AnyAsync(t => t.Id == id);
            if (!exists) return NotFound();

            return await context.Students
                .Where(s => s.Teachers.Any(t => t.Id == id))
                .ToListAsync();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Teacher>> PostTeacher(Teacher teacher)
        {
            var deptExists = await context.Departments.AnyAsync(d => d.Id == teacher.DepartmentId);
            if (!deptExists) return BadRequest($"ID'si {teacher.DepartmentId} olan bölüm bulunamadı.");

            context.Teachers.Add(teacher);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTeacher), new { id = teacher.Id }, teacher);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutTeacher(int id, Teacher teacher)
        {
            if (id != teacher.Id) return BadRequest();
            context.Entry(teacher).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await context.Teachers.FindAsync(id);
            if (teacher == null) return NotFound();
            context.Teachers.Remove(teacher);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}