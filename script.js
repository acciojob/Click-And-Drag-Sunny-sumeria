const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offset = { x: 0, y: 0 };

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    
    // Add visual feedback from your CSS
    container.classList.add('active');
    
    // Switch to absolute positioning on first drag to allow movement
    if (activeCube.style.position !== 'absolute') {
      const rect = activeCube.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      
      // Calculate current position relative to container
      activeCube.style.left = (rect.left - parentRect.left) + 'px';
      activeCube.style.top = (rect.top - parentRect.top) + 'px';
      activeCube.style.position = 'absolute';
      activeCube.style.margin = '0';
    }

    // Calculate exact click point inside the cube to prevent "jumping"
    const cubeRect = activeCube.getBoundingClientRect();
    offset.x = e.clientX - cubeRect.left;
    offset.y = e.clientY - cubeRect.top;
    
    // Ensure the dragged cube stays on top of others
    activeCube.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  
  // Calculate new coordinates relative to the container
  let x = e.clientX - containerRect.left - offset.x;
  let y = e.clientY - containerRect.top - offset.y;

  // Boundary Constraints: Snap back/Stay inside logic
  const maxX = container.clientWidth - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;

  // Prevent moving out of horizontal bounds
  if (x < 0) x = 0;
  if (x > maxX) x = maxX;
  
  // Prevent moving out of vertical bounds
  if (y < 0) y = 0;
  if (y > maxY) y = maxY;

  // Update position
  activeCube.style.left = x + 'px';
  activeCube.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (activeCube) {
    activeCube.style.zIndex = '1';
    activeCube = null;
    container.classList.remove('active');
  }
});