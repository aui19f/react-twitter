import { findUser } from "@/atom/firestore";
import { IResult } from "@/atom/user";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Contents = styled.div`
  width: 400px;
  background-color: #ffffff;
  padding: 40px;
`;
const Logo = styled.div`
  background-image: url("src/assets/images/logo_text.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 120px;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  margin-bottom: 8px;
`;
const Button = styled.button`
  background-color: #fd9597;
  border: 1px solid #fd9597;
  color: #ffffff;
`;

const LinkMsg = styled.div`
  margin: 16px 8px 0 0;
  text-align: right;
  p {
    display: inline-block;
    font-size: 80%;
    color: #aaaaaa;
    curser: pointer;
  }
`;

const Sns = styled.div`
  display: flex;
  justify-content: center;
`;

const Icon = styled.div<{ sns: string }>`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  margin: 0 4px;
  background-image: url(${(props) => `src/assets/images/${props.sns}.png`});
  background-size: contain;
`;

const Err = styled.p`
  margin: 12px 0 16px;
  font-size: 80%;
  color: #f77870;
  text-align: center;
`;

const Hr = styled.div`
  position: relative;
  display: flex;
  margin: 16px 0 24px;
  div {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 1px solid #dddddd;
    top: 12px;
  }
  p {
    background-color: #ffffff;
    display: inline-block;
    padding: 4px;
    color: #dddddd;
    z-index: 9;
    margin: 0 auto;
  }
`;

interface IForm {
  email: string;
  pw: string;
  extraError?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setFocus,
  } = useForm<IForm>();

  const resetError = () => {
    clearErrors("extraError");
  };

  const onValid = async ({ email, pw }: IForm) => {
    const { status }: { status: number } = await findUser(email);
    if (status === 200) {
      //로그인
      try {
        const userCredential = await signInWithEmailAndPassword(
          getAuth(),
          email,
          pw
        );
        // console.log("userCredential", userCredential);
        // const user = userCredential.user;
        navigate("/");
      } catch (error) {
        if (error instanceof Error) {
          console.log("ERR:", error.message);
        } else {
          console.log("??");
        }

        setError("extraError", { message: "Server offline." });
        setFocus("email");
      }

      //페이지이동
    } else {
    }
  };

  const pageMove = () => {
    navigate("/create-account");
  };

  return (
    <Wrapper>
      <Contents>
        <Logo />
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("email", {
              required: "이메일 입력해주세요.",
              onChange: resetError,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
                message: "이메일은 구글(@gmail)만 가능합니다.",
              },
            })}
            placeholder="이메일"
          />
          {errors?.email?.message ? <Err>{errors?.email?.message}</Err> : null}
          <Input
            {...register("pw", {
              required: "비밀번호를 입력해주세요.",
              onChange: resetError,
            })}
            placeholder="비밀번호"
          />
          {errors?.pw?.message ? <Err>{errors?.pw?.message}</Err> : null}

          {errors?.extraError?.message ? (
            <Err>아이디 또는 비밀번호를 확인해주세요.</Err>
          ) : null}
          <Button>로그인</Button>
          <LinkMsg>
            <p onClick={pageMove}>회원가입→</p>
          </LinkMsg>
        </Form>
        <Hr>
          <div></div>
          <p>또는</p>
        </Hr>
        <Sns>
          <Icon sns={"sns_google"} />
          <Icon sns={"sns_x"} />
        </Sns>
      </Contents>
    </Wrapper>
  );
}
