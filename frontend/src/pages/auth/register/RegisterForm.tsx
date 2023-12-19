import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be valid email" }),
    pass: z
      .string()
      .min(1, { message: "Password is required" })
      .min(3, { message: "Minimum 3 character" }), //TODO in production change it to 8 character
    confirmPass: z.string().min(1, { message: "Match password is required" }),
  })
  .refine((data) => data.pass === data.confirmPass, {
    path: ["confirmPass"],
    message: "Password don't match",
  });

type FormData = z.infer<typeof registerSchema>;

interface Props {
  handleSubmitFunc: (
    firstName: string,
    lastName: string,
    email: string,
    pass: string
  ) => void;
}

function RegisterForm({ handleSubmitFunc }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: FieldValues) => {
    handleSubmitFunc(data.firstName, data.lastName, data.email, data.pass);
    reset();
  };

  return (
    <div className="container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <h2>Register</h2>
        </div>
        <div className="mb-3 form-floating">
          <input
            {...register("firstName")}
            id="firstName"
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Enter first name"
          />
          <label htmlFor="firstName">First Name</label>
          {errors.firstName && (
            <p className="text-danger">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-3 form-floating">
          <input
            {...register("lastName")}
            id="lastName"
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Enter last name"
          />
          <label htmlFor="lastName">Last Name</label>
          {errors.lastName && (
            <p className="text-danger">{errors.lastName.message}</p>
          )}
        </div>
        <div className="mb-3 form-floating">
          <input
            {...register("email")}
            id="email"
            type="text"
            className="form-control"
            autoComplete="off"
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
        <div className="mb-3 form-floating">
          <input
            {...register("confirmPass")}
            id="confirmPass"
            type="password"
            className="form-control"
            autoComplete="off"
            placeholder="Enter confirm password"
          />
          <label htmlFor="confirmPass">Confirm Password</label>
          {errors.confirmPass && (
            <p className="text-danger">{errors.confirmPass.message}</p>
          )}
        </div>
        <div className="d-grid mb-3">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <Link to={"/Login"}>Click here to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
