import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Cell = 0 | "X" | "O";

const checkWinner = (board: Cell[][]): Cell | "Draw" | null => {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== 0 &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0];
    }
    if (
      board[0][i] !== 0 &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return board[0][i];
    }
  }
  if (
    board[0][0] !== 0 &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0];
  }
  if (
    board[0][2] !== 0 &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2];
  }
  const isFull = board.every((row) => row.every((cell) => cell !== 0));
  if (isFull) return "Draw";

  return null;
};

export default function App() {
  const [board, setBoard] = useState<Cell[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [isXNext, setIsXNext] = useState<boolean>(true);
  const winner = checkWinner(board);

  const handlePress = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== 0 || winner) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[rowIndex][colIndex] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
 
  const resetGame = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setIsXNext(true);
  };

const getStatusMessage = () => {
  if (winner === "Draw") return "It's a draw!";
  if (winner) return `Winner: ${winner} `;
  return `Turn: ${isXNext ? "X" : "O"}`;
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>

      <Text
        style={[
          styles.statusText,
      winner ? (winner === "Draw" ? styles.drawText : styles.winnerText) : null,  ]}
      >
        {getStatusMessage()}
      </Text>

      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={styles.cell}
                onPress={() => handlePress(rowIndex, colIndex)}
              >
                <Text style={styles.cellText}>{cell === 0 ? "" : cell}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>


      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Play again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#212529",
  },
 
  statusText: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#495057",
  },
  winnerText: {
    color: "#2b8a3e", 
    fontSize: 26,
    fontWeight: "bold",
  },
  drawText: {
    color: "#e67e22", 
    fontSize: 26,
    fontWeight: "bold",
  },
  board: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cellText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#212529",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },

  
  resetButton: {
    marginTop: 30,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});


