import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/views/LoginView');
  return null;
}