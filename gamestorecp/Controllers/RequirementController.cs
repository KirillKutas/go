using gamestorecp.Models;
using gamestorecp.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gamestorecp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequirementController : ControllerBase
    {
        private DatabaseContext _context;

        public RequirementController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<ActionResult<Requirement>> Get(int id)
        {
            var requirement = await _context.Requirements.FirstOrDefaultAsync(x => x.Id == id);

            if (requirement == null)
                return NotFound();

            return Ok(requirement);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Post(Requirement model)
        {
            if (ModelState.IsValid)
            {
                await _context.Requirements
                    .AddAsync(new Requirement()
                    {
                        OS = model.OS,
                        FreeHardDiskSpace = model.FreeHardDiskSpace,
                        Processor = model.Processor,
                        ProductId = model.ProductId,
                        RAM = model.RAM,
                        VideoCard = model.VideoCard,
                    });

                await _context.SaveChangesAsync();

                return Ok(new { message = "Требование успешно создано!" });
            }

            return BadRequest(new { message = "Требование составлено неверно!" });
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var requirement = await _context.Requirements
                .FirstOrDefaultAsync(x => x.Id == id);

            if (requirement == null)
                return NotFound();

            _context.Requirements.Remove(requirement);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Требование успешно удалено!" });
        }
    }
}
