const [product, setProduct] = useState({
      title: 'Loading...',
      description: 'Loading...',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      reviews: [{}],
      stock: 0,
      brand: 'Loading...',
      category: 'Loading...',
      images: [],
});

const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
const [thumbnail, setThumbnail] = useState('');
const [qty, setQty] = useState(1);
const [recommendedProducts, setRecommendedProducts] = useState([])
const { id } = useParams();

useEffect(() => {
      const fetchProductDetailsAndRecommendations = async () => {
            try {
                  const response = await fetch(`http://localhost:8080/products/${id}`);
                  const data = await response.json();
                  await setProduct(data);
                  console.log(product);
                  setThumbnail(data?.images?.length > 0 ? data.images[0] : '');
                  setPriceAfterDiscount(data.price - data.price * data.discountPercentage / 100);

                  if (product.category && product.category !== "Loading...") {
                        const url = `http://localhost:8080/products?category=${product.category}&_sort=-rating,discountPercentage,price`
                        console.log(url);
                        const response = await fetch(url);
                        const data = await response.json();
                        console.log("Recommended", data);
                        await setRecommendedProducts(data);
                  }

                  addTemporaryReviews()
            } catch (error) {
                  console.log(error);
            }
      }
      fetchProductDetailsAndRecommendations();
}, [id]);

// Adding temporary reviews
const addTemporaryReviews = () => {
      setProduct((prevProduct) => ({
            ...prevProduct,
            reviews: [
                  {
                        id: 1,
                        avatar:
                              'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        user: 'John Doe',
                        joinedOn: 'August 2014',
                        rating: 4.5,
                        reviewTitle: 'Thinking to buy another one!',
                        reviewDate: 'March 3, 2017',
                        reviewMsg:
                              'This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems. It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.',
                  },
                  {
                        id: 2,
                        avatar:
                              'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        user: 'Alice Doe',
                        joinedOn: 'August 2014',
                        rating: 3,
                        reviewTitle: 'Thinking to buy another one!',
                        reviewDate: 'March 3, 2017',
                        reviewMsg:
                              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum, porro, totam, doloribus maxime maiores culpa facere aliquid accusamus iste nobis natus magni? Labore, iste. Voluptatem, earum magnam! Qui, dolor?',
                  },
                  {
                        id: 3,
                        avatar:
                              'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        user: 'Bob Doe',
                        joinedOn: 'August 2014',
                        rating: 4.7,
                        reviewTitle: 'Thinking to buy another one!',
                        reviewDate: 'March 3, 2017',
                        reviewMsg:
                              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae mollitia quaerat aperiam aliquid aut tenetur temporibus? Dicta, autem commodi. Quia totam ut, inventore explicabo omnis harum aut id laudantium cupiditate!',
                  },
            ],
      }));
};











const [product, setProduct] = useState({
      title: 'Loading...',
      description: 'Loading...',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      reviews: [{}],
      stock: 0,
      brand: 'Loading...',
      category: 'Loading...',
      images: [],
});
const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
const [thumbnail, setThumbnail] = useState('');
const [qty, setQty] = useState(1);

// Adding temporary reviews
const addTemporaryReviews = () => {
      setProduct((prevProduct) => ({
            ...prevProduct,
            reviews: [
                  {
                        id: 1,
                        avatar:
                              'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        user: 'John Doe',
                        joinedOn: 'August 2014',
                        rating: 4.5,
                        reviewTitle: 'Thinking to buy another one!',
                        reviewDate: 'March 3, 2017',
                        reviewMsg:
                              'This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems. It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.',
                  },
                  {
                        id: 2,
                        avatar:
                              'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        user: 'Alice Doe',
                        joinedOn: 'August 2014',
                        rating: 3,
                        reviewTitle: 'Thinking to buy another one!',
                        reviewDate: 'March 3, 2017',
                        reviewMsg:
                              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur earum, porro, totam, doloribus maxime maiores culpa facere aliquid accusamus iste nobis natus magni? Labore, iste. Voluptatem, earum magnam! Qui, dolor?',
                  },
                  {
                        id: 3,
                        avatar:
                              'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                        user: 'Bob Doe',
                        joinedOn: 'August 2014',
                        rating: 4.7,
                        reviewTitle: 'Thinking to buy another one!',
                        reviewDate: 'March 3, 2017',
                        reviewMsg:
                              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae mollitia quaerat aperiam aliquid aut tenetur temporibus? Dicta, autem commodi. Quia totam ut, inventore explicabo omnis harum aut id laudantium cupiditate!',
                  },
            ],
      }));
};

const aboutScrollRef = useRef(null);
const reviewScrollRef = useRef(null);
const recommendationScrollRef = useRef(null);

const scrollToAbout = () => {
      if (aboutScrollRef.current) {
            aboutScrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
};

const scrollToReview = () => {
      if (reviewScrollRef.current) {
            reviewScrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
}

const scrollToRecommendation = () => {
      if (recommendationScrollRef.current) {
            recommendationScrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
}

const [recommendedProducts, setRecommendedProducts] = useState(
      [
            {
                  "id": "1",
                  "title": "iPhone 9",
                  "description": "An apple mobile which is nothing like apple",
                  "price": 549,
                  "discountPercentage": 12.96,
                  "rating": 4.69,
                  "stock": 94,
                  "brand": "Apple",
                  "category": "smartphones",
                  "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
                  "images": [
                        "https://cdn.dummyjson.com/product-images/1/1.jpg",
                        "https://cdn.dummyjson.com/product-images/1/2.jpg",
                        "https://cdn.dummyjson.com/product-images/1/3.jpg",
                        "https://cdn.dummyjson.com/product-images/1/4.jpg",
                        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
                  ]
            },
            {
                  "id": "2",
                  "title": "iPhone X",
                  "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                  "price": 899,
                  "discountPercentage": 17.94,
                  "rating": 4.44,
                  "stock": 34,
                  "brand": "Apple",
                  "category": "smartphones",
                  "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
                  "images": [
                        "https://cdn.dummyjson.com/product-images/2/1.jpg",
                        "https://cdn.dummyjson.com/product-images/2/2.jpg",
                        "https://cdn.dummyjson.com/product-images/2/3.jpg",
                        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
                  ]
            },
            {
                  "id": "3",
                  "title": "Samsung Universe 9",
                  "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
                  "price": 1249,
                  "discountPercentage": 15.46,
                  "rating": 4.09,
                  "stock": 36,
                  "brand": "Samsung",
                  "category": "smartphones",
                  "thumbnail": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
                  "images": [
                        "https://cdn.dummyjson.com/product-images/3/1.jpg"
                  ]
            }
      ]
);

// const [recommendedProducts, setRecommendedProducts] = useState([{}])
const fetchRecommendedProducts = async () => {
      try {
            if (product.category && product.category !== "Loading...") {
                  const url = `http://localhost:8080/products?category=${product.category}&_sort=-rating,discountPercentage,price`
                  console.log(url);
                  const response = await fetch(url);
                  const data = await response.json();
                  console.log("Recommended", data);
                  await setRecommendedProducts(data);
            }
      } catch (error) {
            console.error('Error fetching recommended products:', error);
      }
};


const { id } = useParams();

useEffect(() => {
      const fetchProduct = async () => {
            try {
                  const response = await fetch(`http://localhost:8080/products/${id}`);
                  const data = await response.json();
                  setProduct(data);
                  console.log(product);
                  setThumbnail(data.images.length > 0 ? data.images[0] : '');
                  setPriceAfterDiscount(data.price - data.price * data.discountPercentage / 100);

                  addTemporaryReviews();
                  await fetchRecommendedProducts()
            } catch (error) {
                  console.error('Error fetching product:', error);
            }
      };

      fetchProduct();
      console.log(product);
}, [id]);