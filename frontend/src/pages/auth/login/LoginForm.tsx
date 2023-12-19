import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

interface Props {
  handleSubmitFunc: (email: string, pass: string) => void;
}

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(30, { message: "Limit of 30 character" })
    .email({ message: "Must be valid email" }),
  pass: z
    .string()
    .min(1, { message: "Password is required" })
    .max(30, { message: "Limit of 30 character" }),
});

type FormData = z.infer<typeof loginSchema>;

const LoginForm = ({ handleSubmitFunc }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: FieldValues) => {
    handleSubmitFunc(data.email, data.pass);
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Login</h2>
        </div>
        <div className="mb-3 form-floating">
          <input
            {...register("email")}
            id="email"
            type="text"
            className="form-control"
            autoComplete="on"
            placeholder="Enter email"
          />
          <label htmlFor="email">Email</label>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3 form-floating">
          <input
            {...register("pass")}
            id="pass"
            type="password"
            className="form-control"
            autoComplete="off"
            placeholder="Enter password"
          />
          <label htmlFor="pass">Password</label>
          {errors.pass && <p className="text-danger">{errors.pass.message}</p>}
        </div>
        <div className="d-grid">
          <button className="btn btn-primary mb-3" type="submit">
            Login
          </button>
        </div>
        <div>
          <Link to={"/Register"}>Click here to Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
