import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
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
      const res = await axios.post('https://instaclone-nn56.onrender.com/api/v1/user/login', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
        setInput({ email: '', password: '' });
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center">
        {/* LEFT SIDE - Phone mockup */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <img
            src="https://uglycartooncharacters.com/wp-content/uploads/2025/04/main-34.jpg"            alt="Phone mockup"
            className="w-[500px] h-auto"
          />
        </div>

        {/* RIGHT SIDE - Login Form */}
        <form
          onSubmit={signupHandler}
          className="w-full max-w-sm bg-black text-white border border-gray-700 rounded-md px-10 py-8 flex flex-col items-center"
        >
          <h1 className="text-4xl font-logo mb-6">Instagram</h1>

          <Input
            type="text"
            name="email"
            placeholder="Phone number, username, or email"
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
              'Log in'
            )}
          </Button>

          <div className="my-4 flex items-center w-full">
            <hr className="flex-grow border-gray-700" />
            <span className="mx-4 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-blue-500 hover:underline flex items-center justify-center gap-2"
          >
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiI3UJUyGtMgJZyTvk25Ij6RWY2wde1zp6F5jg16xMDXIowv6hXcWa1NMIMR0jX-UgSb59R7CWZPj_xSxhFmOFVuvPwhXEOw0lyB9qgSw1mxgpHHygSwibP72EQrWEnWnTl8m6Ibk1Wv48/s0-rw/Facebook+f+%25282019%2529+Flat+Logo+Icon+-+Download+Free+PNG.png" alt="fb" className="h-5 w-5" />
            Log in with Facebook
          </Button>

          <div className="text-sm mt-4 text-blue-400 cursor-pointer hover:underline">
            Forgot password?
          </div>

          <div className="text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
