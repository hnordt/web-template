import React from "react"

const products = [
  {
    id: 1,
    imageUrl:
      "https://cdn.dooca.store/160/products/mairo-composicao-6-min_620x620+fill_ffffff.jpg?v=1595423154",
    name: "Brinco Ear Hook Elos",
    price: 69.9,
  },
  {
    id: 2,
    imageUrl: "/products/7.png",
    name: "Brinco Ear Hook Étnico Colors",
    price: 54.95 * 2,
  },
  {
    id: 3,
    imageUrl: "/products/8.png",
    videoUrl: "/products/3.mov",
    name: "Argola Oval Color (G)",
    price: 124,
  },
  {
    id: 4,
    imageUrl: "/products/9.jpg",
    videoUrl: "/products/4.mov",
    name: "Brinco Trio de Argolas Estrelas",
    price: 162,
  },
  {
    id: 5,
    imageUrl: "/products/10.jpg",
    videoUrl: "/products/5.mov",
    name: "Ear Cuff 3 Estrelas",
    price: 65,
  },
  {
    id: 6,
    imageUrl: "/products/11.jpg",
    name: "Argola Dupla",
    price: 91,
  },
]

export default function Index() {
  return (
    <>
      <nav className="sticky z-20 top-0 px-6 py-5 bg-white border-b">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <img src="/logo.png" alt="Daffe" className="h-8" />
            </div>
            <div className="flex col-span-6 items-center justify-center">
              <ul className="hidden space-x-12 md:flex">
                <li className="text-gray-900 text-base">Lançamentos</li>
                <li className="text-gray-900 underline text-base font-medium">
                  Brincos
                </li>
                <li className="text-gray-900 text-base">Colares</li>
                <li className="text-gray-900 text-base">Pingentes</li>
                <li className="text-gray-900 text-base">Pulseiras</li>
                <li className="text-gray-900 text-base">Conjutos</li>
              </ul>
            </div>
            <div className="flex col-span-3 items-center justify-end">
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="flex justify-center py-5 border-b">
        <ul className="flex items-center h-8 space-x-12">
          <li className="text-gray-500 underline text-base font-medium">
            Banho Ouro
          </li>
          <li className="text-gray-500 text-base">Banho Ródio Branco</li>
          <li className="text-gray-500 text-base">Banho Ródio Negro</li>
          <li className="text-gray-500 text-base">Piercing Fake</li>
        </ul>
      </div> */}
      <main className="pb-14 pt-12 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-center text-4xl font-medium tracking-tight">
            Brincos
          </h1>
          <p className="mt-1 text-center text-gray-500 text-base">
            Enalteça toda sua beleza e feminilidade
          </p>
          {/* <div className="flex mt-9">
            <nav
              class="flex px-12 py-2 bg-gray-50 rounded-lg space-x-12"
              aria-label="Tabs"
            >
              <a href="#" class="text-gray-900 underline text-base font-medium">
                Todos
              </a>
              <a href="#" class="text-gray-900 text-base">
                Banho Ouro
              </a>
              <a href="#" class="text-gray-900 text-base">
                Banho Ródio Branco
              </a>
              <a href="#" class="text-gray-900 text-base">
                Banho Ródio Negro
              </a>
              <a href="#" class="text-gray-900 text-base">
                Piercing Fake
              </a>
            </nav>
          </div> */}
          <div className="flex mt-12 md:space-x-6">
            <nav
              className="hidden w-60 space-y-1 md:block"
              aria-label="Sidebar"
            >
              {/* Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-900 text-sm font-medium bg-gray-200 rounded-md"
                aria-current="page"
              >
                <span className="truncate">Todos</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-50 rounded-md"
              >
                <span className="truncate">Banho Ouro</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-50 rounded-md"
              >
                <span className="truncate">Banho Ródio Branco</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-50 rounded-md"
              >
                <span className="truncate">Banho Ródio Negro</span>
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-50 rounded-md"
              >
                <span className="truncate">Piercings Fake</span>
              </a>
            </nav>
            <ul className="grid flex-1 gap-6 md:grid-cols-3">
              {products.map((product) => (
                <li key={product.id} className="group flex md:flex-col">
                  <div className="relative flex-shrink-0 w-32 h-32 overflow-hidden md:w-full md:h-80">
                    <img
                      className="absolute inset-0 w-full h-full rounded-l-md m:rounded-l-none group-hover:opacity-80 object-cover transition duration-500 md:rounded-t-md"
                      src={product.imageUrl}
                      alt=""
                    />
                    {product.videoUrl && (
                      <video
                        className="relative z-10 group-hover:block hidden w-full h-full rounded-t-md object-cover"
                        playsInline
                        muted
                        autoPlay
                        loop
                      >
                        <source src={product.videoUrl} type="video/mp4" />
                      </video>
                    )}
                  </div>
                  <div className="relative flex flex-col p-6 bg-gray-50 rounded-r-md m:rounded-r-none md:rounded-b-md">
                    <h2 className="line-clamp-2 text-gray-600 text-sm tracking-wide uppercase md:text-lg">
                      {product.name}
                    </h2>
                    <div className="flex flex-1 items-end justify-between">
                      <p className="mt-1 text-gray-900 text-sm md:text-lg">
                        <strong className="text-gray-900 font-medium">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </strong>
                        <span className="block text-gray-500 text-xs md:text-sm">
                          3x{" "}
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price / 3)}{" "}
                          s/ juros
                        </span>
                      </p>
                      <button
                        type="button"
                        class="absolute -bottom-2 -right-2 inline-flex items-center p-1 text-green-700 bg-green-100 hover:bg-green-200 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-green-500 focus:ring-offset-2 focus:ring-2 md:relative"
                      >
                        <svg
                          class="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
