-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para easystock
CREATE DATABASE IF NOT EXISTS `easystock` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `easystock`;

-- Copiando estrutura para tabela easystock.estoque
CREATE TABLE IF NOT EXISTS `estoque` (
  `est_id` int NOT NULL AUTO_INCREMENT,
  `est_desc` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `est_criado_em` datetime DEFAULT NULL,
  `est_titular` int NOT NULL,
  PRIMARY KEY (`est_id`),
  KEY `est_titular` (`est_titular`),
  CONSTRAINT `estoque_ibfk_1` FOREIGN KEY (`est_titular`) REFERENCES `usuario` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela easystock.estoque: ~12 rows (aproximadamente)
INSERT INTO `estoque` (`est_id`, `est_desc`, `est_criado_em`, `est_titular`) VALUES
	(1, 'catapimbas', '2024-06-16 15:10:42', 1),
	(3, 'Pirulito Kids', '2024-06-16 15:52:30', 2),
	(11, 'Postman', '2024-06-16 17:54:07', 1),
	(13, 'TESTE', '2024-06-16 23:23:03', 1),
	(14, 'teste2', '2024-06-16 23:27:30', 1),
	(15, 'test3', '2024-06-16 23:28:07', 1),
	(17, 'mateus', '2024-06-17 22:41:12', 2),
	(19, 'testando', '2024-08-05 20:13:56', 1),
	(20, 'teste', '2024-11-10 00:00:00', 1),
	(24, 'teste66', '2024-11-22 23:32:17', 1),
	(25, 'teste67', '2024-11-22 23:40:04', 1),
	(26, 'teste68', '2024-11-22 23:46:50', 1);

-- Copiando estrutura para tabela easystock.filiado
CREATE TABLE IF NOT EXISTS `filiado` (
  `fil_id` int NOT NULL AUTO_INCREMENT,
  `fil_master` int NOT NULL,
  `fil_id_usuario` int NOT NULL,
  `fil_estoq` int NOT NULL,
  `fil_inserted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`fil_id`),
  KEY `fil_master` (`fil_master`),
  KEY `fil_id_usuario` (`fil_id_usuario`),
  KEY `fil_estoq` (`fil_estoq`),
  CONSTRAINT `filiado_ibfk_1` FOREIGN KEY (`fil_master`) REFERENCES `usuario` (`usu_id`),
  CONSTRAINT `filiado_ibfk_2` FOREIGN KEY (`fil_id_usuario`) REFERENCES `usuario` (`usu_id`),
  CONSTRAINT `filiado_ibfk_3` FOREIGN KEY (`fil_estoq`) REFERENCES `estoque` (`est_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela easystock.filiado: ~9 rows (aproximadamente)
INSERT INTO `filiado` (`fil_id`, `fil_master`, `fil_id_usuario`, `fil_estoq`, `fil_inserted_at`) VALUES
	(9, 1, 2, 3, '2024-06-16 17:54:07'),
	(21, 2, 2, 17, '2024-06-17 22:41:12'),
	(22, 1, 1, 1, '2024-06-17 22:44:07'),
	(27, 1, 1, 19, '2024-08-05 20:13:56'),
	(28, 1, 2, 19, '2024-08-05 20:15:08'),
	(30, 1, 1, 20, '2024-11-10 10:05:46'),
	(38, 1, 1, 24, '2024-11-22 23:32:17'),
	(39, 1, 1, 25, '2024-11-22 23:40:04'),
	(40, 1, 1, 26, '2024-11-22 23:46:50');

-- Copiando estrutura para procedure easystock.InsereUsuario
DELIMITER //
CREATE PROCEDURE `InsereUsuario`(
	IN `login` VARCHAR(50),
	IN `senha` VARCHAR(50),
	IN `nome` VARCHAR(50),
	IN `email` VARCHAR(50)
)
BEGIN
	INSERT INTO usuario (usu_login,usu_senha,usu_nome,usu_email,usu_data_criado) VALUES (login,senha,nome,email,CURRENT_TIMESTAMP());
END//
DELIMITER ;

-- Copiando estrutura para tabela easystock.movimentacao
CREATE TABLE IF NOT EXISTS `movimentacao` (
  `mov_id` int NOT NULL AUTO_INCREMENT,
  `mov_data` date NOT NULL,
  `mov_hora` time NOT NULL,
  `mov_tipo` tinyint(1) NOT NULL COMMENT '1 entrada; 0 saida',
  `mov_qtd` int NOT NULL,
  `mov_est` int NOT NULL,
  `mov_prod` int NOT NULL,
  PRIMARY KEY (`mov_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela easystock.movimentacao: ~25 rows (aproximadamente)
INSERT INTO `movimentacao` (`mov_id`, `mov_data`, `mov_hora`, `mov_tipo`, `mov_qtd`, `mov_est`, `mov_prod`) VALUES
	(1, '2024-06-18', '01:15:01', 1, 9, 1, 13),
	(2, '2024-06-18', '01:16:42', 0, 8, 1, 13),
	(3, '2024-06-18', '01:24:28', 1, 6, 1, 14),
	(4, '2024-06-18', '01:33:39', 1, 8, 1, 14),
	(5, '2024-06-18', '01:35:26', 0, 1, 1, 14),
	(6, '2024-06-18', '01:35:45', 1, 2, 1, 14),
	(7, '2024-06-18', '01:36:06', 0, 3, 1, 14),
	(8, '2024-06-18', '13:41:37', 0, 1, 1, 5),
	(9, '2024-06-18', '13:41:43', 0, 1, 1, 5),
	(10, '2024-06-18', '13:41:53', 0, 2, 1, 6),
	(11, '2024-06-18', '13:42:20', 0, 1, 1, 6),
	(12, '2024-06-18', '13:42:26', 0, 1, 1, 6),
	(13, '2024-06-18', '13:42:27', 1, 1, 1, 7),
	(14, '2024-06-18', '13:44:02', 0, 1, 1, 6),
	(20, '2024-06-18', '19:31:06', 0, 2, 1, 5),
	(21, '2024-06-18', '19:32:00', 1, 2, 1, 5),
	(25, '2024-08-05', '19:51:03', 1, 3, 1, 21),
	(27, '2024-11-15', '17:11:44', 1, 2, 1, 23),
	(28, '2024-11-15', '17:12:19', 1, 2, 1, 24),
	(30, '2024-11-15', '18:23:12', 1, 3, 1, 5),
	(31, '2024-11-18', '21:56:50', 0, 3, 1, 5),
	(32, '2024-11-18', '21:59:09', 0, 5, 1, 7),
	(33, '2024-11-23', '00:25:27', 1, 2, 1, 27),
	(34, '2024-11-23', '10:37:37', 1, 2, 1, 28),
	(35, '2024-11-23', '13:57:43', 0, 1, 1, 21);

-- Copiando estrutura para tabela easystock.produto
CREATE TABLE IF NOT EXISTS `produto` (
  `prod_id` int NOT NULL AUTO_INCREMENT,
  `prod_nome` varchar(30) NOT NULL,
  `prod_qtd` int NOT NULL,
  `prod_min` int DEFAULT NULL,
  `prod_max` int DEFAULT NULL,
  `prod_estoque` int NOT NULL,
  `prod_inserted_at` datetime NOT NULL,
  PRIMARY KEY (`prod_id`),
  KEY `prod_estoque` (`prod_estoque`),
  CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`prod_estoque`) REFERENCES `estoque` (`est_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela easystock.produto: ~5 rows (aproximadamente)
INSERT INTO `produto` (`prod_id`, `prod_nome`, `prod_qtd`, `prod_min`, `prod_max`, `prod_estoque`, `prod_inserted_at`) VALUES
	(20, 'arroz', 2, NULL, NULL, 3, '2024-08-05 19:42:14'),
	(21, 'catapimbas', 2, 1, 4, 1, '2024-08-05 19:51:03'),
	(22, 'arroiz', 2, NULL, NULL, 3, '2024-11-15 00:00:00'),
	(23, 'Arroz', 2, 1, 5, 1, '2024-11-15 00:00:00'),
	(24, 'arroz', 2, 3, 3, 1, '2024-11-15 00:00:00');

-- Copiando estrutura para tabela easystock.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `usu_id` int NOT NULL AUTO_INCREMENT,
  `usu_login` varchar(15) NOT NULL,
  `usu_senha` varchar(15) NOT NULL,
  `usu_nome` varchar(30) NOT NULL,
  `usu_email` varchar(50) DEFAULT NULL,
  `usu_est_padrao` int DEFAULT NULL,
  `usu_data_criado` datetime DEFAULT NULL,
  PRIMARY KEY (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela easystock.usuario: ~4 rows (aproximadamente)
INSERT INTO `usuario` (`usu_id`, `usu_login`, `usu_senha`, `usu_nome`, `usu_email`, `usu_est_padrao`, `usu_data_criado`) VALUES
	(1, 'thiago', '12345', 'THIAGO', NULL, 1, '2024-05-23 21:55:11'),
	(2, 'Maria', 'maria', 'Maria', 'marial@slaoq.com.,br', NULL, '2024-06-11 19:53:49'),
	(57, 'antedegemon', '1234567', 'antonio', 'ant@gmail.com', NULL, '2024-11-20 22:04:41'),
	(58, 'antedegemon2', '1234567', 'antonio', 'ant@gmail.com', NULL, '2024-11-20 22:05:53');

-- Copiando estrutura para função easystock.ValidaUsuario
DELIMITER //
CREATE FUNCTION `ValidaUsuario`(usuario VARCHAR(50), senha VARCHAR(50)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
	DECLARE usuarioExiste BOOLEAN;
	SELECT EXISTS(SELECT 1 FROM usuario WHERE usu_login = usuario AND usu_senha = senha) INTO usuarioExiste; 
	RETURN usuarioExiste;
END//
DELIMITER ;

-- Copiando estrutura para trigger easystock.AdicionaNaFiliado
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `AdicionaNaFiliado` AFTER INSERT ON `estoque` FOR EACH ROW INSERT INTO filiado (fil_master,fil_id_usuario,fil_estoq,fil_inserted_at) VALUES (NEW.est_titular,NEW.est_titular, NEW.est_id,CURRENT_TIMESTAMP())//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Copiando estrutura para trigger easystock.AdicionaNaMovimentacao
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `AdicionaNaMovimentacao` AFTER INSERT ON `produto` FOR EACH ROW INSERT INTO movimentacao (mov_data,mov_hora,mov_tipo,mov_qtd,mov_est,mov_prod) VALUES (CURDATE(),CURTIME(),1,NEW.prod_qtd,NEW.prod_estoque,NEW.prod_id)//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Copiando estrutura para trigger easystock.InsereNaMovimentacao
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `InsereNaMovimentacao` AFTER UPDATE ON `produto` FOR EACH ROW BEGIN
		DECLARE QTD INT ;
		
	IF OLD.prod_qtd > NEW.prod_qtd THEN
		SET QTD = OLD.prod_qtd - NEW.prod_qtd;
		INSERT INTO movimentacao (mov_data,mov_hora,mov_tipo,mov_qtd,mov_est,mov_prod) VALUES (CURDATE(),CURTIME(),0,QTD,NEW.prod_estoque,NEW.prod_id);
	END IF;
	IF OLD.prod_qtd < NEW.prod_qtd THEN
		SET QTD = NEW.prod_qtd - OLD.prod_qtd;
		INSERT INTO movimentacao (mov_data,mov_hora,mov_tipo,mov_qtd,mov_est,mov_prod) VALUES (CURDATE(),CURTIME(),1,QTD,NEW.prod_estoque,NEW.prod_id);
	END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
