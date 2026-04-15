using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityApi.Data;
using UniversityApi.Models;

namespace UniversityApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            return await context.Departments
                .Include(d => d.Teachers)
                .Include(d => d.Students)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await context.Departments
                .Include(d => d.Teachers)
                .Include(d => d.Students)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (department == null) return NotFound();
            return department;
        }

        [HttpGet("{id}/teachers")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetDepartmentTeachers(int id)
        {
            var exists = await context.Departments.AnyAsync(d => d.Id == id);
            if (!exists) return NotFound();

            return await context.Teachers
                .Where(t => t.DepartmentId == id)
                .ToListAsync();
        }

        [HttpGet("{id}/students")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Student>>> GetDepartmentStudents(int id)
        {
            var exists = await context.Departments.AnyAsync(d => d.Id == id);
            if (!exists) return NotFound();

            return await context.Students
                .Where(s => s.DepartmentId == id)
                .ToListAsync();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            context.Departments.Add(department);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, department);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutDepartment(int id, Department department)
        {
            if (id != department.Id) return BadRequest();
            context.Entry(department).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await context.Departments.FindAsync(id);
            if (department == null) return NotFound();
            context.Departments.Remove(department);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}