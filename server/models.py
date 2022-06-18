class Game:
    def __init__(self, board, player):
        self.board = board
        self.player = player

    def get_cell_value(self ,x ,y):
        return self.board[y][x]
    
    def set_cell_value(self ,x ,y, value):
        self.board[y][x] = value

    def is_board_full(self):
        for row in self.board:
            for value in row:
                if value == 0:
                    return False
        return True
    
    def clear_grid(self):
        for y in range(len(self.board)):
            for x in range(len(self.board[y])):
                self.set_cell_value(x, y , 0)
    