const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offset = { x: 0, y: 0 };

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    
    // 1. Activate drag mode & visual feedback
    container.classList.add('active');
    
    // 2. Transition from Grid Flow to Absolute Positioning
    // This only runs the first time you click a specific cube
    if (activeCube.style.position !== 'absolute') {
      const rect = activeCube.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      
      // Calculate position relative to the container's top-left corner
      activeCube.style.left = (rect.left - parentRect.left) + 'px';
      activeCube.style.top = (rect.top - parentRect.top) + 'px';
      activeCube.style.position = 'absolute';
      activeCube.style.margin = '0'; 
    }

    // 3. Calculate exactly where the mouse is inside the cube
    const cubeRect = activeCube.getBoundingClientRect();
    offset.x = e.clientX - cubeRect.left;
    offset.y = e.clientY - cubeRect.top;
    
    // Bring the selected cube to the very top layer
    activeCube.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  
  // 4. Calculate new position relative to the container
  let x = e.clientX - containerRect.left - offset.x;
  let y = e.clientY - containerRect.top - offset.y;

  // 5. Constraints: Snap back inside the defined area
  const maxX = container.clientWidth - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;

  // Horizontal boundaries
  if (x < 0) x = 0;
  if (x > maxX) x = maxX;
  
  // Vertical boundaries
  if (y < 0) y = 0;
  if (y > maxY) y = maxY;

  // 6. Apply smooth movement
  activeCube.style.left = x + 'px';
  activeCube.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (activeCube) {
    // Drop the cube and reset container state
    activeCube.style.zIndex = '1';
    activeCube = null;
    container.classList.remove('active');
  }
});