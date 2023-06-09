import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookMarkForm from "../components/BookmarkForm";
import BookmarkCard from "../components/BookmarkCard";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import BookmarkDetails from "../components/BookmarkDetails";

interface Category {
  id: number;
  name: string;
}

interface Bookmark {
  id?: number;
  title: string;
  url: string;
  category: string;
}

const Bookmark: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [allBookmarks, setAllBookmarks] = useState<Bookmark[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    axios
      .get<{ categories: Category[] }>("http://localhost:8080/categories")
      .then((res: any) => {
        setCategories(res.data);
      });

    axios
      .get<{ bookMarks: Bookmark[] }>("http://localhost:8080/bookmarks")
      .then((res: any) => {
        setAllBookmarks(res.data);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (bookmark: Bookmark, e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post<Bookmark>("http://localhost:8080/bookmarks", bookmark)
      .then((res) => {
        setAllBookmarks((prevBookmarks) => [
          ...(prevBookmarks || []),
          res.data,
        ]);
      });
  };

  return (
    <div className="flex">
      <div className="flex-[0.7] grid grid-cols-2 gap-3 m-3">
        {categories &&
          categories.map((category) => (
            <div key={category.id}>
              <div className="text-2xl mb-2 text-Black font-semibold">
                {category.name}
              </div>
              <CategoryCard>
                {allBookmarks &&
                  allBookmarks.map((bookmark) => {
                    if (bookmark.category === category.name) {
                      return (
                        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                      );
                    } else return null;
                  })}
              </CategoryCard>
            </div>
          ))}
      </div>
      <div className="flex-[0.3] flex flex-col m-2">
        <div className="flex justify-end">
          <Button variant="contained" onClick={handleOpen}>
            Create Bookmark
          </Button>
          <Modal open={open} onClose={handleClose}>
            <div className="bg-white p-4 w-96 mt-12 mr-2 float-right rounded-md">
              <BookMarkForm
                submitForm={handleSubmit}
                handleClose={handleClose}
              />
            </div>
          </Modal>
        </div>
        <div className="mt-[65vh] ml-36">
          <BookmarkDetails />
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
