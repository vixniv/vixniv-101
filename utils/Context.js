import { useContext, createContext, useState } from "react";

const ScrollPos = createContext();
const ActiveLink = createContext();
const WorkData = createContext();

export const CustomProvider = ({ children }) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [activeLink, setActiveLink] = useState("All Work");
  const [workData, setWorkData] = useState([]);

  return (
    <ScrollPos.Provider value={{ scrollPos, setScrollPos }}>
      <ActiveLink.Provider value={{ activeLink, setActiveLink }}>
        <WorkData.Provider value={{ workData, setWorkData }}>
          {children}
        </WorkData.Provider>
      </ActiveLink.Provider>
    </ScrollPos.Provider>
  );
};

export const useScrollPos = () => useContext(ScrollPos);
export const useActiveLink = () => useContext(ActiveLink);
export const useWorkData = () => useContext(WorkData);
