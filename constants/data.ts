import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';
import { Boxes } from 'lucide-react';

export type User = {
  id: number;
  name: string;
  product: string;
  verified: boolean;
  status: string;
};

export type Customer = {
  name: string;
  phone: number;
  gender: string;
};
export type Product = {
  name: string;
  costPrice: number;
  sellingPrice: number;
  skuCode:number;
};

export type Invoice = {
  id: number;
  name:string;
  phone:string;
  email:string;
  status:string; // paid or pending
  address:string;
  amount:number;
}

export const customers: Customer[]=[
  {
    name:"Deepak",
    phone:123456789,
    gender:"Male"
  },
];
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    product: 'Dell',
    verified: false,
    status: 'Paid'
  },
  {
    id: 12,
    name: 'Deepak Varshney',
    product: 'shirt',
    verified: false,
    status: 'Paid'
  },

];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Invoice',
    href: '/dashboard/invoice',
    icon: 'invoice',
    label: 'invoice'
  },
  {
    title: 'Products',
    href: '/dashboard/product',
    icon: 'post',
    label: 'invoice'
  },
  {
    title: 'Customers',
    href: '/dashboard/customer',
    icon: 'user',
    label: 'customer'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
