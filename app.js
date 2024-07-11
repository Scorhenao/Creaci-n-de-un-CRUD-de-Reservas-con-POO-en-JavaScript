// Auth class
class Auth {
    // Static method to log in a user
    static login(user) {
      // Generate a token
        const token = Auth.generateToken();
  
      // Store the token and user information in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  
    // Static method to log out a user
    static logout() {
      // Remove the token and user information from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  
    // Static method to generate a token
    static generateToken() {
      // Generate a random 36-character string
      return Math.random().toString(36).substr(2);
    }
  }
  
  // id
  class id{
    constructor(id){
      this.id = id
    }

    static crearId(){
      return this
    }
  }

  // Persona
  class Persona {
    constructor(nombre, email, password, role) {
      this.id = id
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.role = role;
    }

    // Create user
    static crearUsuario() {
      // Implement user creation logic
      const nombre = this.nombre
      const email = this.email
      const password = this.password
      const role = this.role
      // Validate user inputs
      if (!nombre || !email || !password || !role) {
        throw new Error('Todos los campos son obligatorios');
      }
      // Encrypt password
      const encryptedPassword = bcrypt.hashSync(password, 10);
  
      // Create user
      const newUser = new this(
        nombre,
        email,
        encryptedPassword,
        role
      );
      
      // Return user
      console.log(`${this.nombre} ha creado un nuevo usuario`);
      return newUser;
    }
    
    // keep user
    static keepUser() {
      // Implement user keep logic
      let usuarios = []
      const data = this.crearUsuario()
      usuarios.push(data)

    }

    // register user
    static registrarUsuario() {
      // Implement user registration logic

      console.log(`${this.nombre} se ha registrado`);
    }

    // create reserve user
    static crearReservaDeUsuario() {
      // Implement user reservation logic
      console.log(`${this.nombre} ha reservado una habitación`);
    }
  }

  // UsuarioRegular class
  class UsuarioRegular {
    constructor(nombre, email) {
      this.nombre = nombre;
      this.email = email;
    }
  
    // Method to register the user as a regular user
    registrarseComoUsuarioRegular() {
      // Implement registration logic
      console.log(`${this.nombre} se ha registrado como usuario regular`);
    }
      // createReserve usuarioRegular
      static createReserveUserRegular() {
        // Implement user reservation logic
        console.log(`${this.nombre} ha reservado una habitación`);
      }
  }

  
  
  // Administrador class
  class Administrador {
    constructor(nombre, email) {
      this.nombre = nombre;
      this.email = email;
    }
  
    // Method to create an admin user
    crearUsuarioAdmin() {
      // Implement admin user creation logic
      console.log(`${this.nombre} ha creado un nuevo usuario admin`);
    }

    // createReserve admin for some passengers
    static createReserveAdmin() {
      // Implement admin reservation logic
      console.log(`${this.nombre} ha reservado una habitación`);
    }

    // delete reserves
    static deleteReserve() {
      // Implement reservation deletion logic
      console.log(`${this.nombre} ha eliminado una reserva`);
    }

    // update reserves
    static updateReserve() {
      // Implement reservation update logic
      console.log(`${this.nombre} ha actualizado una reserva`);
    }
  }
  
  // Example usage
  const usuario = new UsuarioRegular('Juan', 'juan@example.com');
  usuario.registrarseComoUsuarioRegular();
  
  const admin = new Administrador('Admin', 'admin@example.com');
  admin.crearUsuarioAdmin();