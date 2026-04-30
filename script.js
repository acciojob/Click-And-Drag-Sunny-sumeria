const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offset = { x: 0, y: 0 };

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    
    // Add visual feedback class from your CSS
    container.classList.add('active');
    
    // Set absolute positioning only when clicked to allow dragging
    // This transitions the cube from 'grid flow' to 'free movement'
    if (cube.style.position !== 'absolute') {
      const rect = cube.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      
      // Calculate current position relative to container
      cube.style.left = (rect.left - parentRect.left + container.scrollLeft) + 'px';
      cube.style.top = (rect.top - parentRect.top) + 'px';
      cube.style.position = 'absolute';
      cube.style.margin = '0'; // Prevent offset jumps
    }

    // Calculate mouse offset within the cube
    const cubeRect = cube.getBoundingClientRect();
    offset.x = e.clientX - cubeRect.left;
    offset.y = e.clientY - cubeRect.top;
    
    // Bring dragged cube to the front
    cube.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  
  // Calculate new coordinates
  let x = e.clientX - containerRect.left - offset.x;
  let y = e.clientY - containerRect.top - offset.y;

  // Boundary Constraints
  const maxX = container.scrollWidth - activeCube.offsetWidth;
  const maxY = container.offsetHeight - activeCube.offsetHeight;

  // Snap back/stay inside logic
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;

  activeCube.style.left = x + 'px';
  activeCube.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (activeCube) {
    activeCube.style.zIndex = '';
    activeCube = null;
    container.classList.remove('active');
  }
});