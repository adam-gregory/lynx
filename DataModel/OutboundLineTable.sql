USE [LynxDelivery]
GO

/****** Object:  Table [dbo].[OutboundLine]    Script Date: 03/31/2016 12:56:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[OutboundLine](
	[OutboundlineID] [bigint] IDENTITY(1,1) NOT NULL,
	[OutboundID] [bigint] NOT NULL,
	[ItemID] [nvarchar](20) NULL,
	[ItemDesc] [nvarchar](1000) NULL,
	[Qty] [real] NULL,
 CONSTRAINT [PK_OutboundLine] PRIMARY KEY CLUSTERED 
(
	[OutboundlineID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[OutboundLine]  WITH CHECK ADD  CONSTRAINT [FK_OutboundLine_Outbound] FOREIGN KEY([OutboundID])
REFERENCES [dbo].[Outbound] ([OutboundID])
GO

ALTER TABLE [dbo].[OutboundLine] CHECK CONSTRAINT [FK_OutboundLine_Outbound]
GO

