"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Player {
  id: string;
  Name: string;
  Rank: number;
  "Live Points": string;
  // Ajoutez d'autres propriétés au besoin
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);




  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://ultimate-tennis1.p.rapidapi.com/live_leaderboard/500';
      const options = {
        headers: {
          'X-RapidAPI-Key': 'c1df27eb82msh67680d6ccd3fc4ep1a3814jsn04a0217415cd',
          'X-RapidAPI-Host': 'ultimate-tennis1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Convertir la réponse en JSON
        if (result && result.data) {
          setPlayers(result.data); // Stocker uniquement la liste d'objets dans le state
          console.log(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="w-full">
      
        <Table>
        <TableCaption>A list of ATP Players.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Players</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        {players.map((player) => (
        <TableBody key={player.id}>
          <TableRow>
            <TableCell className="font-medium">{player.Rank}</TableCell>
            <TableCell>{player.Name}</TableCell>
            <TableCell className="text-right">{player["Live Points"]}</TableCell>
          </TableRow>
        </TableBody>
        ))}
      </Table>
      
    </ul>
  );
}

