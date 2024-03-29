import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTietSanPham from './layouts/product/ChiTietSanPham';
import DangKyNguoiDung from './layouts/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from './layouts/user/Test';
import ThemSach_Admin from './layouts/admin/ThemSach';
import Error403 from './layouts/Error/Error403';
import UserCheck from './layouts/user/UserAccount';
import { GioHangProvider } from './layouts/utils/GioHangContext';
import DanhSachGioHang from './layouts/product/components/cart/DanhSachGioHang';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
    <GioHangProvider>
    <div className="App">
      <BrowserRouter>
        <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
        <Routes>

          <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}></Route>
          <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/sach/:maSach' element={<ChiTietSanPham />}></Route>
          <Route path='/dang-ky' element={<DangKyNguoiDung />} />
          <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
          <Route path='/dang-nhap' element={<DangNhap />} />
          <Route path='/test' element={<Test />} />
          <Route path='/admin/them-sach' element={<ThemSach_Admin />} />
          <Route path='/bao-loi-403' element={<Error403 />} />
          <Route path='/gio-hang' element={<DanhSachGioHang />} />
          <Route path='/nguoi-dung' element={<UserCheck />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </GioHangProvider>
  );
}

export default App;
