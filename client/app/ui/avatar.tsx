import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarUser = ({ src }: { src?: string }) => {
  return (
    <Avatar>
      <AvatarImage
        src={
          src
            ? src
            : "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
        }
        alt="@Avatar"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export default AvatarUser;
