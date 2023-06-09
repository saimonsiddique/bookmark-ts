import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Bookmark {
  title: string;
  url: string;
  category: string;
}

const BookmarkDetails: React.FC = () => {
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios
        .get<Bookmark>(`http://localhost:8080/bookmarks/${id}`)
        .then((res) => {
          setBookmark(res.data);
        });
    }
  }, [id]);

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-md rounded-xl  bg-rose-400">
        <div className="">
          <div className="card-body">
            <h2 className="m-auto card-title">Bookmark Details</h2>
            <div className="flex flex-col bg-white p-4">
              <div>
                <span className="font-bold">Title: </span>
                <span>{bookmark?.title}</span>
              </div>
              <div>
                <span className="font-bold">URL: </span>
                <Link
                  to={bookmark?.url || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {bookmark?.url}
                </Link>
              </div>
              <div>
                <span className="font-bold">Category: </span>
                <span>{bookmark?.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookmarkDetails;
