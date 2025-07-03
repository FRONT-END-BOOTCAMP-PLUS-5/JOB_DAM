'use client';

interface IProps {
  children: React.ReactNode;
}

const Container = ({ children }: IProps) => {
  return <main>{children}</main>;
};

export default Container;
