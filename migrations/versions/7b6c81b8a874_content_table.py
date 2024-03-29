"""content table

Revision ID: 7b6c81b8a874
Revises: 
Create Date: 2023-03-16 14:08:21.924108

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '7b6c81b8a874'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('viewers')
    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.add_column(sa.Column('views', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('likes', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.drop_column('likes')
        batch_op.drop_column('views')

    op.create_table('viewers',
    sa.Column('user_name', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('id', sa.VARCHAR(length=15), autoincrement=False, nullable=False),
    sa.Column('user_email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('password_hash', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('viewerreg', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('user_name', name='viewers_pkey'),
    sa.UniqueConstraint('id', name='viewers_id_key'),
    sa.UniqueConstraint('user_email', name='viewers_user_email_key')
    )
    # ### end Alembic commands ###
