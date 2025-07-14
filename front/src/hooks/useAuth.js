export const useAuth = () => {
    const login = (email, password) => {
      const users = JSON.parse(localStorage.getItem("fakeUsers")) || [];
      return users.find(
        (u) => u.email === email && u.password === password
      );
    };
  
    const register = (name, email, password) => {
      const users = JSON.parse(localStorage.getItem("fakeUsers")) || [];
      const exists = users.some((u) => u.email === email);
      if (exists) return false;
      users.push({ name, email, password });
      localStorage.setItem("fakeUsers", JSON.stringify(users));
      return true;
    };
  
    return { login, register };
  };