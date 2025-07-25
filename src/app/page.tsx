'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import Sidebar from './components/Sidebar';
import TopbarMobile from './components/TopbarMobile';
import allProducts from './products/productsData';
import FavouriteButton from "./components/FavouriteButton";


const featuredProducts = allProducts.filter(p => p.featured);

export default function Home() {
  const { user } = useAuth();
  const [favSuccess, setFavSuccess] = useState<string | null>(null);
  const [favsUpdate, setFavsUpdate] = useState(0);

  useEffect(() => {
    const handleFavUpdate = () => setFavsUpdate(prev => prev + 1);
    window.addEventListener("favourites-updated", handleFavUpdate);

    return () => window.removeEventListener("favourites-updated", handleFavUpdate);
  }, []);

  // Página para usuarios no autenticados (similar a la imagen de referencia)
  const UnauthenticatedHome = () => (
    <div className="d-flex flex-column min-vh-100">
      

      {/* Carrusel principal */}
      <Carousel className="mb-4">
        <Carousel.Item>
          <div style={{ height: '500px', position: 'relative' }}>
            <Image 
              src="/images/product1.svg" 
              alt="Colección de verano" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
            <Carousel.Caption className="text-start">
              <h2 className="display-4 fw-bold">Nueva Colección</h2>
              <p className="lead">Descubre las últimas tendencias</p>
              <Button variant="dark" size="lg" className="mt-3">Comprar ahora</Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
      
      {/* Sección de categorías */}
      <Container className="py-4">
        <h2 className="text-center mb-4 fw-bold">Categorías Destacadas</h2>
        <Row>
          <Col md={4} className="mb-4">
            <div className="position-relative" style={{ height: '400px' }}>
              <Image 
                src="/images/category-women.svg" 
                alt="Mujer" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center">
                <h3 className="text-white fw-bold mb-3">Mujer</h3>
                <Button as={Link} href="/products/mujer" variant="dark" className="rounded-1 px-4">Ver Colección</Button>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="position-relative" style={{ height: '400px' }}>
              <Image 
                src="/images/category-men.svg" 
                alt="Hombre" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center">
                <h3 className="text-white fw-bold mb-3">Hombre</h3>
                <Button as={Link} href="/products/hombre" variant="dark" className="rounded-1 px-4">Ver Colección</Button>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="position-relative" style={{ height: '400px' }}>
              <Image 
                src="/images/category-kids.svg" 
                alt="Niños" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
              <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center">
                <h3 className="text-white fw-bold mb-3">Niños</h3>
                <Button as={Link} href="/products/ninos" variant="dark" className="rounded-1 px-4">Ver Colección</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Sección de productos destacados */}
      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold">Productos Destacados</h2>
        <Row>
          {featuredProducts.map((product) => (
            <Col key={product.id} md={3} sm={6} className="mb-4">
              <div className="product-card">
                <div
                  className="position-relative"
                  style={{
                    width: 'auto',
                    height: '300px',
                    margin: '0 auto',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '1rem 1rem 0 0',
                    overflow: 'hidden'
                  }}
                >
                  {product.images && product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={300}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        margin: '0 auto'
                      }}
                    />
                  )}
                </div>
                <div className="py-2">
                  <h5 className="mb-1">{product.name}</h5>
                  <p className="fw-bold mb-0">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button 
            as={Link} 
            href="/products" 
            variant="dark" 
            className="rounded-1 px-4"
          >
            Ver todos los productos
          </Button>
        </div>
      </Container>
      
      {/* Banner de suscripción */}
      <div className="bg-light py-5 my-4">
        <Container className="text-center">
          <h3 className="fw-bold mb-3">Únete a Fashion News</h3>
          <p className="mb-4">Recibe las últimas tendencias y ofertas exclusivas</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Tu correo electrónico" />
                <Button variant="dark" className="rounded-0">Suscribirse</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-light text-dark py-5 mt-auto border-top">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">Comprar</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><Link href="/products/mujer" className="text-dark text-decoration-none">Mujer</Link></li>
                <li className="mb-2"><Link href="/products/hombre" className="text-dark text-decoration-none">Hombre</Link></li>
                <li className="mb-2"><Link href="/products/ninos" className="text-dark text-decoration-none">Niños</Link></li>
                <li className="mb-2"><Link href="/products/bebe" className="text-dark text-decoration-none">Bebé</Link></li>
                <li className="mb-2"><Link href="/products/sport" className="text-dark text-decoration-none">Sport</Link></li>
              </ul>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">Nosotros</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><Link href="/about" className="text-dark text-decoration-none">Acerca de nosotros</Link></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold mb-3">Contacto</h5>
              <p className="mb-1">Email: info@tiendaropa.com</p>
              <p className="mb-0">Teléfono: (123) 456-7890</p>
            </Col>
          </Row>
          <hr className="my-4" />
          <div className="text-center">
            <p className="small">&copy; {new Date().getFullYear()} Fashion Store. Todos los derechos reservados.</p>
          </div>
        </Container>
      </footer>
    </div>
  );

  // Página para usuarios autenticados
  const AuthenticatedHome = () => (
    <div className="d-flex flex-column min-vh-100">
      {/* Topbar móvil - fuera del flujo flex para que no ocupe espacio vertical */}
      <TopbarMobile />
      
      <div className="d-flex flex-grow-1">
        {/* Sidebar desktop - solo se muestra en pantallas grandes */}
        <Sidebar />
        
        <main className="flex-grow-1 w-100">
          <Container className="py-5 py-lg-5 py-md-2 py-sm-2">
            <h1 className="fw-bold text-center mb-5">Bienvenido a Fashion Store</h1>
            <Row className="g-4">
              {featuredProducts.map((product) => (
                <Col key={`${product.id}-${favsUpdate}`} xs={12} sm={6} md={3}>
                  <Card className="h-100 border-0 shadow-sm position-relative">
                    <div
                      className="position-relative"
                      style={{
                        width: 'auto',
                        height: '300px',
                        margin: '0 auto',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '1rem 1rem 0 0',
                        overflow: 'hidden'
                      }}
                    >
                      {product.images && product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={200}
                          height={300}
                          style={{
                            objectFit: 'contain',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            margin: '0 auto'
                          }}
                        />
                      )}
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title className="fw-bold">{product.name}</Card.Title>
                        <Card.Text className="text-primary fw-bold fs-5 mb-2">
                          ${product.price.toFixed(2)}
                        </Card.Text>
                      </div>
                      
                      <div className="d-flex gap-2">
                        <Button
                          as={Link}
                          href={`/products/${product.id}`}
                          variant="dark"
                          className="flex-grow-1 rounded-1"
                        >
                          Ver Detalles
                        </Button>

                        <FavouriteButton
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            images: product.images,
                            description: product.description,
                          }}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

          </Container>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Tienda de Ropa</h5>
              <p>Las mejores prendas para toda la familia.</p>
            </Col>
            <Col md={4}>
              <h5>Enlaces</h5>
              <ul className="list-unstyled">
                <li><Link href="/" className="text-white">Inicio</Link></li>
                <li><Link href="/products" className="text-white">Productos</Link></li>
                <li><Link href="/about" className="text-white">Nosotros</Link></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Contacto</h5>
              <p>Email: info@tiendaropa.com</p>
              <p>Teléfono: (123) 456-7890</p>
            </Col>
          </Row>
          <hr />
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Tienda de Ropa. Todos los derechos reservados.</p>
          </div>
        </Container>
      </footer>
    </div>
  );

  return user ? <AuthenticatedHome /> : <UnauthenticatedHome />;
}
