'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginView() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); // Clear any previous errors when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // This would be replaced with your actual API call
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      
      // Mock authentication for demonstration
      // In a real app, you would validate credentials against your backend
      const mockCheckCredentials = () => {
        // Demo credentials for different user types
        if (credentials.email === 'doctor@example.com' && credentials.password === 'password') {
          return { success: true, role: 'doctor', id: 201 };
        } else if (credentials.email === 'patient@example.com' && credentials.password === 'password') {
          return { success: true, role: 'paciente', id: 101 };
        } else if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          return { success: true, role: 'admin', id: 1 };
        }
        return { success: false, message: 'Credenciales inválidas' };
      };
      
      const result = mockCheckCredentials();
      
      if (result.success) {
        // Store user info in localStorage or a state management solution
        localStorage.setItem('user', JSON.stringify({
          role: result.role,
          id: result.id,
          email: credentials.email
        }));
        
        // Redirect based on role
        switch (result.role) {
          case 'doctor':
            router.push('/views/MedicoView');
            break;
          case 'paciente':
            router.push('/views/PacienteView');
            break;
          case 'admin':
            router.push('/views/AdminView');
            break;
          case 'enfermera':
            router.push('/views/EnfermeraView');
          break;
          default:
            router.push('/');
            break;
        }
      } else {
        setError(result.message || 'Error de inicio de sesión');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // This would be your actual API call to register a user
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      
      // Mock registration for demonstration
      setTimeout(() => {
        // Simulating a successful registration
        setIsRegistering(false);
        setCredentials({ ...credentials });
        alert('Registro exitoso. Por favor inicie sesión con sus credenciales.');
        setIsLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Error al registrar. Por favor intente nuevamente.');
      console.error('Registration error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? 'Registrar Cuenta' : 'Iniciar Sesión'}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded flex justify-center items-center`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isRegistering ? 'Registrando...' : 'Iniciando sesión...'}
              </>
            ) : (
              isRegistering ? 'Registrar' : 'Iniciar Sesión'
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            disabled={isLoading}
          >
            {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿Necesitas una cuenta? Regístrate'}
          </button>
        </div>
        
        {!isRegistering && (
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2">Credenciales de demostración:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-left">
              <div className="bg-gray-50 p-2 rounded">
                <strong>Doctor:</strong><br />
                doctor@example.com<br />
                password
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <strong>Paciente:</strong><br />
                patient@example.com<br />
                password
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}