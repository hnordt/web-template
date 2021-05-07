import React from "react"
import cn from "classnames"
import products from "data/products"

export default function HomeScreen() {
  const product = products[1]

  return (
    <main className="flex items-center justify-center min-h-screen bg-black bg-opacity-75">
      <div
        className={cn(
          "w-full bg-white rounded-md shadow-lg overflow-hidden",
          product.imageUrl ? "max-w-[1200px]" : "max-w-[600px]"
        )}
      >
        <div className="h-[600px] flex">
          {product.imageUrl && (
            <div className="flex-1">
              <img
                className="w-full h-full object-cover"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
          )}
          <div className="flex flex-1 flex-col">
            <div className="px-6 py-5">
              <h1 className="text-gray-900 text-lg font-medium">
                {product.name}
              </h1>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="mt-4 text-sm">
                {product.originalPrice} - {product.price}
              </p>
            </div>
            <div className="flex-1 overflow-auto">
              {product.components.map((component) => (
                <div key={component.id}>
                  <div className="sticky top-0 px-6 py-5 bg-gray-50 border-b border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2>{component.name}</h2>
                      <p>
                        {component.min}/{component.max}{" "}
                        {component.min > 0 && "(obrigatório)"}
                      </p>
                    </div>
                  </div>
                  <div className="divide-gray-200 divide-y">
                    {component.options.map((option) => (
                      <div key={option.id} className="px-6 py-5">
                        <div className="space-y-0.5">
                          <h3 className="text-gray-900 text-sm font-medium">
                            {option.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {option.description}
                          </p>
                        </div>
                        {option.price > 0 && (
                          <p className="mt-3 text-red-600 text-sm font-medium">
                            +{option.price}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200">
              <div>
                <label>Algum comentário?</label>
                <textarea placeholder="Ex.: tirar cebola, maionese à parte, etc." />
              </div>
            </div>
            <div>TODO</div>
          </div>
        </div>
      </div>
    </main>
  )
}
