import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Signup = () => {
  const [input, setInput] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
        setInput({ username: '', email: '', password: '' });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={signupHandler}
        className="w-full max-w-sm bg-black text-white border border-gray-700 rounded-md p-6 flex flex-col items-center"
      >
        <h1 className="text-4xl font-logo mb-6">Instagram</h1>

        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={input.username}
          onChange={changeEventHandler}
          className="mb-3 bg-neutral-900 border border-neutral-700 text-white"
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={changeEventHandler}
          className="mb-3 bg-neutral-900 border border-neutral-700 text-white"
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={changeEventHandler}
          className="mb-4 bg-neutral-900 border border-neutral-700 text-white"
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Sign up'
          )}
        </Button>

        <div className="text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
