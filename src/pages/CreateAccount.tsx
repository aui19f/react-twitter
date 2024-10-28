import { useForm } from "react-hook-form";
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addUser } from "@/atom/firestore";
import { enumRole, enumStatus, IResult } from "@/atom/user";
import { useNavigate } from "react-router-dom";
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

const Txt = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 24px;
  justify-content: center;
  img {
    height: 56px;
  }
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
  margin: 16px 0 0 8px;

  p {
    font-size: 80%;
    color: #aaaaaa;
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
  pw2: string;
  nickname?: string;
  extraError?: string;
}
export default function CreateAccount() {
  const navi = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IForm>();

  const resetError = () => {
    clearErrors("extraError");
  };

  const onValid = async ({ email, pw, pw2, nickname }: IForm) => {
    if (pw !== pw2) {
      setError("pw2", { message: "비밀번호가 다릅니다." });
    } else {
      if (nickname?.replace(/ /gi, "") === "") {
        console.log(email.split("@")[0]);
      }
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        pw
      );

      const uid: string = userCredential?.user?.uid;

      const { status = 999, message }: IResult = await addUser({
        uid,
        email,
        nickname,
        createdAt: new Date().getTime() + "",
        status: enumStatus.ready,
        role: enumRole.guest,
      });

      if (status === 200) {
        navi("/");
      } else {
        setError("extraError", { message: "Server offline." });
      }
    }
  };

  return (
    <Wrapper>
      <Contents>
        <Txt>
          <img src="src/assets/images/logo.png" alt="로고" />
          <h2>회원가입</h2>
        </Txt>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              onChange: resetError,
              // pattern: {
              //   value: /^[A-Za-z0-9._%+-]+@google.com$/,
              //   message: "이메일은 구글(@google)만 가능합니다.",
              // },
            })}
            placeholder="이메일"
          />
          {errors?.email?.message ? <Err>{errors?.email?.message}</Err> : null}
          <Input
            placeholder="비밀번호"
            {...register("pw", {
              required: "비밀번호를 입력해주세요.",
              onChange: resetError,
              // minLength: {
              //   value: 8,
              //   message: "8글자 이상으로 입력해주세요.",
              // },
            })}
          />
          {errors?.pw?.message ? <Err>{errors?.pw?.message}</Err> : null}
          <Input
            placeholder="비밀번호 확인"
            {...register("pw2", {
              required: "비밀번호 체크해주세요.",
              onChange: resetError,
            })}
          />
          {errors?.pw2?.message ? <Err>{errors?.pw2?.message}</Err> : null}
          <Input
            {...register("nickname", { onChange: resetError })}
            placeholder="닉네임"
          />

          {errors?.extraError?.message ? (
            <Err>아이디 또는 비밀번호를 확인해주세요.</Err>
          ) : null}

          <Button>가입</Button>
          <LinkMsg>
            <p>←로그인</p>
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
