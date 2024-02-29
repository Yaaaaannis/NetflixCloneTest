'use client'


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "@/components/header";
import { Modal } from "@/components/modals/modal";
import { useAuth, } from "@/hooks/useauth";
import FeaturedMovie from "@/components/featured-movie";
import { useMovies, Movie } from '@/hooks/usemovies';
import { useModal } from "@/hooks/usemodal";

import Image from 'next/image';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';



const Homepage: React.FC = () => {
  const { user, signOutUser, loading } = useAuth();
  const router = useRouter();
  const { categories } = useMovies();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { onOpen } = useModal();

  const openFilmModal = (movie: Movie) => {
    onOpen("filmModal", { movie });
  }



  // if (!user) {
  //   console.log("Redirige vers /pages/signin car user est null");
  //   router.push('/pages/signin');
  // }
  useEffect(() => {
    if (!loading && !user) { // Ajouter une vérification pour loading
      router.push('/pages/signin');
    }
  }, [user, loading, router]);

  // const isServer = typeof window === "undefined";
  // if (!isServer) {
  //   window.location.href = '/pages/signin';
  // }






  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div>
        <FeaturedMovie />
      </div>
      <div className="bg-black pt-28">
        {categories.map((category) => (
          <div key={category.slug} className="py-4">
            <h2 className=" text-2xl  text-left ml-6  text-white text-bold ">{category.title}</h2>
            <Splide
              options={{
                type: "loop",
                drag: "free",
                arrows: false,
                pagination: false,
                perPage: 10,
                breakpoints: {
                  480: {
                    perPage: 2,
                    gap: '3px',
                  },
                },
              }}
              // extensions={{ AutoScroll }}
              className="mx-auto py-2 " // Centre le carrousel
            >
              {/* Utilisez px-[100px] sur le SplideSlide si vous souhaitez un grand padding */}
              {category.movies.map((movie) => (
                <SplideSlide key={movie.id} className="gap-4 py-4">
                  <div className="flex justify-center "> {/* Centre l'image dans le slide */}
                    <Image
                      className="cursor-pointer transition-all duration-300 transform rounded-2xl "
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={200} // Ajustez la taille selon le besoin
                      height={400}
                      onClick={() => openFilmModal(movie)}
                    // layout="responsive"
                    />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        ))}
      </div >
      <Modal />
    </div >


  );
}

export default Homepage;
