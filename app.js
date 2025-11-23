let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let editIndex = null;

const form = document.getElementById("userForm");
const tabla = document.getElementById("userTable");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

      // Validación
    if (nombre.trim() === "" || email.trim() === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (editIndex === null) {
        usuarios.push({ nombre, email });
    } else {
        usuarios[editIndex] = { nombre, email };
        editIndex = null;
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    form.reset();
    mostrarUsuarios();
});

function mostrarUsuarios() {
    tabla.innerHTML = "";

    usuarios.forEach((u, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>
                    <button class="edit-btn" onclick="editarUsuario(${i})">Editar</button>
                    <button class="delete-btn" onclick="eliminarUsuario(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function editarUsuario(index) {
    const u = usuarios[index];
    document.getElementById("nombre").value = u.nombre;
    document.getElementById("email").value = u.email;
    editIndex = index;
}

function eliminarUsuario(index) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuarios();
}

mostrarUsuarios();
