import React from "react";

const ProductCard = ({user}) => {
  return (
    <div className="border-black border-2 p-2">
      <h4 className="font-semibold">Name : {user.name}</h4>
      <h4 className="text-sm">Phone :{user.phone}</h4>
      <p className="text-sm">Email : {user.email}</p>
      <p className="text-sm">Username : {user.username}</p>
    </div>
  );
};

export default ProductCard;
